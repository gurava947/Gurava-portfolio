import unittest

from support import run_solution


class AlphabeticSymbolTest(unittest.TestCase):
    def test_case_01_n_4(self):
        """N = 4."""
        result = run_solution('alphabetic-symbol', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'A \nA B \nA B C \nA B C D \n')

    def test_case_02_n_5(self):
        """N = 5."""
        result = run_solution('alphabetic-symbol', '5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'A \nA B \nA B C \nA B C D \nA B C D E \n')


if __name__ == "__main__":
    unittest.main()
