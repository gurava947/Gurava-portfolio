import unittest

from support import run_solution


class IdentifyTheMistakeNumberPyramTest(unittest.TestCase):
    def test_case_01_n_4(self):
        """n = 4."""
        result = run_solution('identify-the-mistake-number-pyram', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '   1\n  212\n 32123\n4321234\n')

    def test_case_02_n_3(self):
        """n = 3."""
        result = run_solution('identify-the-mistake-number-pyram', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '  1\n 212\n32123\n')


if __name__ == "__main__":
    unittest.main()
