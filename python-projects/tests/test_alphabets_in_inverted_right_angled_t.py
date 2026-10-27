import unittest

from support import run_solution


class AlphabetsInInvertedRightAngledTTest(unittest.TestCase):
    def test_case_01_n_4(self):
        """N = 4."""
        result = run_solution('alphabets-in-inverted-right-angled-t', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'A B C D \nA B C \nA B \nA \n')

    def test_case_02_n_3(self):
        """N = 3."""
        result = run_solution('alphabets-in-inverted-right-angled-t', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'A B C \nA B \nA \n')


if __name__ == "__main__":
    unittest.main()
