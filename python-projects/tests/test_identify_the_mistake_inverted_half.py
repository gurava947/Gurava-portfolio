import unittest

from support import run_solution


class IdentifyTheMistakeInvertedHalfTest(unittest.TestCase):
    def test_case_01_n_4(self):
        """N = 4."""
        result = run_solution('identify-the-mistake-inverted-half', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '4321\n321\n21\n1\n')

    def test_case_02_n_3(self):
        """N = 3."""
        result = run_solution('identify-the-mistake-inverted-half', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '321\n21\n1\n')


if __name__ == "__main__":
    unittest.main()
