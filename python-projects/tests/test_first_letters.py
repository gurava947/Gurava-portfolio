import unittest

from support import run_solution


class FirstLettersTest(unittest.TestCase):
    def test_case_01_alpha_beta_gamma(self):
        """alpha, beta, gamma."""
        result = run_solution('first-letters', 'alpha\nbeta\ngamma\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'abg\n')

    def test_case_02_gurava_rahul_nxtwave(self):
        """Gurava, Rahul, NxtWave."""
        result = run_solution('first-letters', 'Gurava\nRahul\nNxtWave\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'GRN\n')

    def test_edge_01_empty_middle_line(self):
        """Empty middle line."""
        result = run_solution('first-letters', 'a\n\nb\n')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('IndexError', result.stderr)
        self.assertEqual(result.stdout, "")

    def test_edge_02_unicode_words(self):
        """Unicode words."""
        result = run_solution('first-letters', 'గురు\nరాహుల్\nనెక్స్ట్\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'గరన\n')


if __name__ == "__main__":
    unittest.main()
